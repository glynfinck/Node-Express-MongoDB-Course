module.exports = (product, page) => {
  let pageFinal = page.replace(/{%PRODUCT_ID%}/g, product.id);
  pageFinal = pageFinal.replace(/{%PRODUCT_NAME%}/g, product.productName);
  pageFinal = pageFinal.replace(/{%PRODUCT_IMAGE%}/g, product.image);
  pageFinal = pageFinal.replace(/{%PRODUCT_PRICE%}/g, product.price);
  pageFinal = pageFinal.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
  pageFinal = pageFinal.replace(/{%PRODUCT_FROM%}/g, product.from);
  pageFinal = pageFinal.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
  pageFinal = pageFinal.replace(
    /{%PRODUCT_DESCRIPTION%}/g,
    product.description
  );
  if (product.organic) {
    pageFinal = pageFinal.replace(/{%NOT_ORGANIC%}/g, '');
  } else {
    pageFinal = pageFinal.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return pageFinal;
};
