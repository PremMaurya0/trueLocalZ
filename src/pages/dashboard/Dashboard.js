

import Sidebar from '../../components/Sidebar'


function Dashboard() {
  return (
    <>
    <div className="wrapper">

    <Sidebar></Sidebar>

     <div id="content">
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i className="fas fa-align-left"></i>
              
            </button>

        </div>
        </nav>
        
        <h1>Dashboard</h1>
      </div>
    </div>
   
    </>
  );
}

export default Dashboard;
