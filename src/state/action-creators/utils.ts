import airtableFetcher from '../../utils/airtableFetcher'

export const verifyUserAndFetchClassIds = (
  user: string
): Promise<{ userExists: boolean; classIds?: string[] }> => {
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
              classIds: record.get('Classes'),
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
              classIds: users[0].classIds,
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

export const fetchClasses = (classIds: string[]): Promise<Course[]> => {
  return new Promise((resolve, reject) => {
    const classes: any[] = []
    let query = ''
    classIds.forEach((classId, index) => {
      if (index < classIds.length - 1) {
        query += `RECORD_ID() = '${classId}',`
      } else {
        query += `RECORD_ID() = '${classId}'`
      }
    })

    airtableFetcher('Classes')
      .select({
        filterByFormula: `OR(${query})`,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            classes.push({
              name: record.get('Name'),
              students: record.get('Students'),
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
          resolve(classes)
        }
      )
  })
}
