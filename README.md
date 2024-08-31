# Sonieum Domains Metadata Service

## API

### Request
- __network:__ Name of the chain to query for. (mainnet | sepolia ...)
- __contactAddress:__ accepts contractAddress of the NFT which represented by the tokenId
- __NFT v1 - tokenId:__ accepts ENS name or labelhash of ENS name in both hex and int format
- __NFT v2 - tokenId:__ accepts ENS name or namehash of ENS name in both hex and int format

```
/{network}/{contractAddress}/{tokenId}
```

Request (example)

https://metadata.sonieum.domains/minato/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/42219085255511335250589442208301538195142221433306354426240614732612795430543/

### Response (example)

```json
{
  "is_normalized": true,
  "name": "nick.son",
  "description": "nick.son, a Sonieum Domain.",
  "attributes": [
    {
      "trait_type": "Created Date",
      "display_type": "date",
      "value": 1571924851000
    },
    {
      "trait_type": "Length",
      "display_type": "number",
      "value": 4
    },
    {
      "trait_type": "Segment Length",
      "display_type": "number",
      "value": 4
    },
    {
      "trait_type": "Character Set",
      "display_type": "string",
      "value": "letter"
    },
    {
      "trait_type": "Registration Date",
      "display_type": "date",
      "value": 1580803395000
    },
    {
      "trait_type": "Expiration Date",
      "display_type": "date",
      "value": 1699709554000
    }
  ],
  "name_length": 4,
  "segment_length": 4,
  "url": "https://sonieum.domains/nick.son",
  "version": 0,
  "background_image": "https://metadata.sonieum.domains/minato/avatar/nick.son",
  "image": "https://metadata.sonieum.domains/minato/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/0x5d5727cb0fb76e4944eafb88ec9a3cf0b3c9025a4b2f947729137c5d7f84f68f/image",
  "image_url": "https://metadata.sonieum.domains/minato/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/0x5d5727cb0fb76e4944eafb88ec9a3cf0b3c9025a4b2f947729137c5d7f84f68f/image"
}

```

More info and list of all endpoints: https://metadata.sonieum.domains/docs


## How to setup

```
git clone https://github.com/soneium-domains/sonieum-domains-metadata-service.git
cd sonieum-domains-metadata-service
cp .env.org .env // Fill in Vars
yarn
yarn dev
```

