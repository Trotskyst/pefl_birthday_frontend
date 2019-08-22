// export default {
//     actions: {
//       async fetchBirthday({ commit, getters, dispatch }, limit = 3) {
//         const res = await fetch(
//           'https://jsonplaceholder.typicode.com/posts?_limit=' + limit
//         )
//         const posts = await res.json()
  
//         dispatch('sayHello')
  
//         commit('updatePosts', posts)
//       },
//       sayHello() {}
//     },
//     mutations: {
//       updatePosts(state, posts) {
//         state.posts = posts
//       },
//       createPost(state, newPost) {
//         state.posts.unshift(newPost)
//       }
//     },
//     state: {
//       posts: []
//     },
//     getters: {
//       allPosts(state) {
//         return state.posts
//       },
//     }
//   }
  