require('dotenv').config();
import { request }        from 'graphql-request';
import { 
  JsonRpcProvider, 
  hexlify, 
  zeroPadValue 
}                         from 'ethers';
import {
  GET_REGISTRATIONS,
  GET_DOMAINS,
  GET_DOMAINS_BY_LABELHASH,
  GET_WRAPPED_DOMAIN,
}                           from './subgraph';
import { Metadata }         from './metadata';
import { getAvatarImage }   from './avatar';
import {
  ExpiredNameError,
  NamehashMismatchError,
  SubgraphRecordNotFound,
  Version,
}                         from '../base';
import { NetworkName }    from './network';
import { 
  decodeFuses, 
  getWrapperState 
}                             from '../utils/fuse';
import { createBatchQuery }   from '../utils/batchQuery';
import { getNamehash }        from '../utils/namehash';
import { bigIntToUint8Array } from '../utils/bigIntToUint8Array';

const eth =
  '0x7d074ff60790193d6f1639a7404e70caff96bb1ae486f61939ce4e42695b49a1';
const GRACE_PERIOD_MS = 7776000000; // 90 days as milliseconds
const HOST = process.env.HOST || 'localhost'
export async function getDomain(
  provider: JsonRpcProvider,
  networkName: NetworkName,
  SUBGRAPH_URL: string,
  contractAddress: string,
  tokenId: string,
  version: Version,
  loadImages: boolean = true
): Promise<Metadata> {
  let hexId: string, intId;
  if (!tokenId.match(/^0x/)) {
    intId = tokenId;
    hexId = zeroPadValue(hexlify(bigIntToUint8Array(BigInt(tokenId))), 32);
  } else {
    intId = BigInt(tokenId).toString();
    hexId = tokenId;
  }
  const queryDocument: string =
    version !== Version.v2 ? GET_DOMAINS_BY_LABELHASH : GET_DOMAINS;

  const newBatch = createBatchQuery('getDomainInfo');
  newBatch.add(queryDocument).add(GET_REGISTRATIONS).add(GET_WRAPPED_DOMAIN);
  console.log(newBatch.query());
  console.log(SUBGRAPH_URL);

  const domainQueryResult = await request(SUBGRAPH_URL, newBatch.query(), { tokenId: hexId });
  console.log(domainQueryResult);

  const domain = version !== Version.v2 ? domainQueryResult.domains[0] : domainQueryResult.domain;
  console.log(domain)
  if (!(domain && Object.keys(domain).length))
    throw new SubgraphRecordNotFound(`No record for ${hexId}`);
  const { name, createdAt, parent, resolver, id: namehash } = domain;
  
  /**
   * IMPORTANT
   *
   * This check must be done in any case,
   * the reason is unfortunately the graph does strip null characters
   * from names, so even though the namehash is different,
   * domains with or without null byte look identical
   */
  // if (getNamehash(name) !== namehash) {
  //   throw new NamehashMismatchError(
  //     `TokenID of the query does not match with namehash of ${name}`,
  //     404
  //   );
  // }


  const metadata = new Metadata({
    name: name.replace('.eth','.son'),
    created_date: createdAt,
    tokenId: hexId,
    version,
  });

  async function requestAvatar() {
    try {
      const [buffer, mimeType] = await getAvatarImage(provider, name.replace('.eth','.son'));
      if (mimeType === 'text/html') return;
      const base64 = buffer.toString('base64');
      return [base64, mimeType];
    } catch {
      /* do nothing */
    }
  }

  async function requestMedia(isAvatarExist: boolean) {
    if (loadImages) {
      if (isAvatarExist) {
        const avatar = await requestAvatar();
        if (avatar) {
          const [base64, mimeType] = avatar;
          metadata.setBackground(base64, mimeType);
        }
      }
      metadata.generateImage();
    } else {
      metadata.setBackground(
        `${HOST}${networkName}/avatar/${name.replace('.eth','.son')}`
      );
      metadata.setImage(
        `${HOST}${networkName}/${contractAddress}/${hexId}/image`
      );
    }
  }

  async function requestAttributes() {
    if (parent.id === eth && domainQueryResult.registrations?.length) {
      const registration = domainQueryResult.registrations[0];
      const registered_date = registration.registrationDate * 1000;
      const expiration_date = registration.expiryDate * 1000;
      if (expiration_date + GRACE_PERIOD_MS < +new Date()) {
        throw new ExpiredNameError(
          `'${name.replace('.eth','.son')}' is already been expired at ${new Date(
            expiration_date
          ).toUTCString()}.`,
          410
        );
      }
      if (registration) {
        metadata.addAttribute({
          trait_type: 'Registration Date',
          display_type: 'date',
          value: registered_date,
        });
        metadata.addAttribute({
          trait_type: 'Expiration Date',
          display_type: 'date',
          value: expiration_date,
        });
      }
    }

    if (version === Version.v2 && domainQueryResult.wrappedDomain) {
      const {
        wrappedDomain: { fuses, expiryDate },
      } = domainQueryResult;
      const decodedFuses = decodeFuses(fuses);

      metadata.addAttribute({
        trait_type: 'Namewrapper Fuse States',
        display_type: 'object',
        value: decodedFuses,
      });

      metadata.addAttribute({
        trait_type: 'Namewrapper Expiry Date',
        display_type: 'date',
        value: expiryDate * 1000,
      });

      metadata.addAttribute({
        trait_type: 'Namewrapper State',
        display_type: 'string',
        value: getWrapperState(decodedFuses),
      });
      metadata.description += metadata.generateRuggableWarning(
        metadata.name, version, getWrapperState(decodedFuses)
      );
    }
  }
  const isAvatarExist = resolver?.texts && resolver.texts.includes('avatar');
  await Promise.all([requestMedia(isAvatarExist), requestAttributes()]);
  return metadata;
}
