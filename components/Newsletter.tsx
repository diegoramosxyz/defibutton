export default function Newsletter() {
  return (
    <>
      <h1 className="text-xl font-bold text-center mb-4">
        Subscribe to out newsletter
      </h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid md:flex justify-center gap-3 mb-7"
      >
        <label htmlFor="email" className="sr-only">
          Enter email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email here"
          className="dark:border-trueGray-600 dark:bg-trueGray-900 transition focus:outline-none border font-medium px-3 py-1 rounded-md focus:border-lightBlue-700 dark:focus:border-lightBlue-400"
        />
        <button className="select-none focus:outline-none focus:ring-2 transition border font-medium px-3 py-1 normal-case rounded-md border-lightBlue-600 dark:border-lightBlue-300 text-lightBlue-900 dark:text-lightBlue-50 hover:bg-lightBlue-100 dark:hover:bg-lightBlue-800 focus:ring-lightBlue-500 focus:bg-lightBlue-200 dark:focus:bg-lightBlue-900">
          Subscribe!
        </button>
      </form>
    </>
  )
}
