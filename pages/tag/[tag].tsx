export default function Tag() {

  function filterByTag(posts: any, tag: string) {
    return posts.filter(
      // TODO: ADD TYPE
      (post: any) => !!post.data.tags.find((value: string) => value === tag)
    )
  }

  return (
    <div>

    </div>
  )
}
