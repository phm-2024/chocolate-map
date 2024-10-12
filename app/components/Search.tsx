import React, { useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      search: { value: string }
    }

    const { value } = target.search

    setSearch(value)
    console.log(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" placeholder="Search your chocolate" />

      <button>Search</button>
    </form>
  )
}

export default Search
