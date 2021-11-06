import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://trung-api-capstone1.herokuapp.com',
})

const popup = () => {
  <div className="modal" tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Modal title</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
}
axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')

  if (!token) {
    alert('You need to login again')
    // {popup}
    return config
  }

  token = token.includes('Bearer') ? token : `Bearer ${token}`

  config.headers['Authorization'] = token

  return config
})

export default axiosInstance
