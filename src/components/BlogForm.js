import { useState } from 'react' 

const BlogForm = ({createBlog}) => {

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogCreation = (event) => {
        event.preventDefault()

        const blogObject = {
            title: title,
            author: author,
            url: url,
        }

        createBlog(blogObject)

        setAuthor('')
        setTitle('')
        setUrl('')
    } 


    return(
        <form onSubmit={handleBlogCreation}>
            <div>
            title
            <input
                type="text"
                value={title}
                name="Username"
                onChange={({ target }) => setTitle(target.value)}
            />
            </div>
            <div>
            author
                <input
                type="text"
                value={author}
                name="Password"
                onChange={({ target }) => setAuthor(target.value)}
            />
            </div>
            <div>
            url
                <input
                type="text"
                value={url}
                name="Password"
                onChange={({ target }) => setUrl(target.value)}
            />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogForm