import { useBook } from "@/hooks/useBook";

export default function Book() {
  const { book } = useBook();

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.name}</h1>
          <p>{book.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}