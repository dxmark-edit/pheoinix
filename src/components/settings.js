import './settings.css';
export default function Settings() {
    return (
      <div className="settings-page">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
  
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              placeholder="Your username"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
  
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
  
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  }
  