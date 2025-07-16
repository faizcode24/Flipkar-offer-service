const Offer = require('../models/offer');

exports.createOffers = async (req, res) => {
  const { flipkartOfferApiResponse } = req.body;

  if (!flipkartOfferApiResponse) return res.status(400).json({ error: 'Payload missing' });

  const offers = extractOffers(flipkartOfferApiResponse);
  let noOfOffersIdentified = offers.length;
  let noOfNewOffersCreated = 0;

  for (const offer of offers) {
    const exists = await Offer.findOne({ title: offer.title, bankName: offer.bankName });
    if (!exists) {
      await Offer.create(offer);
      noOfNewOffersCreated++;
    }
  }

  res.json({ noOfOffersIdentified, noOfNewOffersCreated });
};

exports.getHighestDiscount = async (req, res) => {
  const { amountToPay, bankName, paymentInstrument } = req.query;

  if (!amountToPay || !bankName) return res.status(400).json({ error: 'Missing parameters' });

  let query = { bankName };
  if (paymentInstrument) query.paymentInstruments = paymentInstrument;

  const offers = await Offer.find(query);
  let maxDiscount = 0;

  offers.forEach(offer => {
    if (amountToPay >= offer.minTransactionAmount) {
      maxDiscount = Math.max(maxDiscount, offer.discountAmount);
    }
  });

  res.json({ highestDiscountAmount: maxDiscount });
};

function extractOffers(apiResponse) {
  // --- Dummy Extractor (replace with real structure from Flipkart API) ---
  const offersList = apiResponse.offers || [];
  return offersList.map(o => ({
    title: o.title,
    bankName: o.bank,
    discountAmount: o.discountValue,
    minTransactionAmount: o.minAmount || 0,
    paymentInstruments: o.instruments || ['CREDIT'],
    offerCode: o.code,
    validity: {
      start: new Date(o.startDate),
      end: new Date(o.endDate)
    }
  }));
}
