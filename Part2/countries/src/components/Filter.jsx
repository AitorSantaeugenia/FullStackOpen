import React from 'react'

const Filter = ({ filter, handleFilter }) => (
    <form>
    <div>
      find countries with <input value={filter} onChange={handleFilter} />
    </div>
  </form>
  
)
export default Filter;