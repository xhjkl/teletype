export const isContentValid = (title: string, author: string, body: string) =>
  title.length > 0 && title.length < 256 && author.length > 0 && body.length > 0
