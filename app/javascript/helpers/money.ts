const FORMATTERS = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
}

const formatMoney = (amount, currencyCode: string) => FORMATTERS[currencyCode].format(amount)

export { formatMoney }
