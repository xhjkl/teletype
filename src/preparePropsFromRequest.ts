export const preparePropsForMainPage = async () => {
  return { title: `Teletype` }
}

export const preparePropsForArticleWithName = async (name: string) => {
  return { title: `Teletype :: ${name}` }
}
