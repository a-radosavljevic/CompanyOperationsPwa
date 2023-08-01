const TextDanger = ({ message }) => (
    message && <p className="text-danger">
        {message}
    </p>
)

export default TextDanger;