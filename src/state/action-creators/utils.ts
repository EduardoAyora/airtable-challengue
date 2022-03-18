import airtableFetcher from '../../utils/airtableFetcher'

export const verifyUserExists = (user: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const users: any[] = []
    airtableFetcher('Students')
      .select({
        filterByFormula: `{Name} = '${user}'`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            users.push(record.get('Name'))
          })
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          if (users.length > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      )
  })
}
