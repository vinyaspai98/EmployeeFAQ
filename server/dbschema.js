let db = {
  users: [
    {
      userId: 'dh23ggj5h32g543j5gf43',
      email: 'user@email.com',
      userName: 'user',
      fullName:'user',
      createdAt: '2019-03-15T10:59:52.798Z',
      imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      bio: 'Hello, my name is user, nice to meet you',
      location: 'Lonodn, UK',
      phoneNumber:'4563256985'
    }
  ],
  questions: [
    {
      userName: 'user',
      title:"TITLE",
      imageUrl : 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      body: 'This is a sample scream',
      postedAt: '2019-03-15T10:59:52.798Z',
      likeCount: 5,
      commentCount: 3
    }
  ],
  comments: [
    {
      userName: 'user',
      questionId: 'kdjsfgdksuufhgkdsufky',
      body: 'nice one mate!',
      postedAt: '2019-03-15T10:59:52.798Z'
    } 
  ],
  notifications: [
    {
      receiver: 'user',
      sender: 'john',
      read: 'true | false',
      questionId: 'kdjsfgdksuufhgkdsufky',
      postedAt: '2019-03-15T10:59:52.798Z'
    }
  ]
};
// const userDetails = {
//   // Redux data
//   credentials: {
//     userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
//     email: 'user@email.com',
//     handle: 'user',
//     createdAt: '2019-03-15T10:59:52.798Z',
//     imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
//     bio: 'Hello, my name is user, nice to meet you',
//     website: 'https://user.com',
//     location: 'Lonodn, UK'
//   },
//   likes: [
//     {
//       userHandle: 'user',
//       screamId: 'hh7O5oWfWucVzGbHH2pa'
//     },
//     {
//       userHandle: 'user',
//       screamId: '3IOnFoQexRcofs5OhBXO'
//     }
//   ]

