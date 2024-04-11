const Create = () => {
    return (
      <div className="create container">
        <h2>Create a new Task</h2>
        <div className="connect-acc">
          <form>
            <label htmlFor="title">
              Title
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter a title for your task"
                required
              />
            </label>
            <label htmlFor="skills">
              Required skills
              <input
                type="text"
                name="skills"
                id="skills"
                placeholder="Enter list of skills seperated by comma (JAVA, Android, Phython)"
                required
              />
            </label>
            <label htmlFor="desc">
              Description
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="15"
                placeholder="Enter a short description for your task"
                required
              ></textarea>
            </label>
            <div
              className="create-cancel"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button type="submit" className="btn">
                Cancel
              </button>
              <button type="submit" className="cta-button btn">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Create;
  