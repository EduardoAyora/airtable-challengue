import airtableFetcher from '../../utils/airtableFetcher'

export const verifyUserAndFetchClassIds = (
  user: string
): Promise<{ userExists: boolean; classes?: string[] }> => {
  return new Promise((resolve, reject) => {
    const users: any[] = []
    airtableFetcher('Students')
      .select({
        filterByFormula: `{Name} = '${user}'`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            users.push({
              classes: record.get('Classes'),
            })
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
            resolve({
              userExists: true,
              classes: users[0].classes,
            })
          } else {
            resolve({
              userExists: false,
            })
          }
        }
      )
  })
}
