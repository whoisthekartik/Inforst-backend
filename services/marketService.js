const MarketItem = require("../models/MarketItem");
const Nft = require("../models/Nft");

const listNFT = async (ownerId, nftId, price) => {
  const nft = await Nft.findById(nftId);
  if (!nft || nft.owner.toString() !== ownerId.toString()) {
    throw new Error("Unauthorized or NFT not found");
  }

  const marketItem = new MarketItem({
    nft: nft._id,
    seller: ownerId,
    price,
    status: "listed",
  });

  await marketItem.save();
  return marketItem;
};

const buyNFT = async (buyerId, marketItemId) => {
  const item = await MarketItem.findById(marketItemId).populate("nft");
  if (!item || item.status !== "listed") throw new Error("Item not available");

  // Transfer ownership
  item.nft.owner = buyerId;
  await item.nft.save();

  item.status = "sold";
  item.buyer = buyerId;
  await item.save();

  return item;
};

module.exports = {
  listNFT,
  buyNFT,
};