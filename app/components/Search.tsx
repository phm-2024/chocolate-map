import React, { useEffect, useState } from 'react'
import Intro from './Intro'

const Search = () => {
  const [search, setSearch] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      search: { value: string }
    }

    const { value } = target.search

    setSearch(value)
  }

  useEffect(() => {
    return () => setSearch('')
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Search your chocolate" />

        <button>Search</button>
      </form>

      {search ? <Intro searchTerm={search} /> : <Intro searchTerm="" />}
    </>
  )
}

export default Search
