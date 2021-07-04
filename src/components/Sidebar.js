import React from 'react'
import { Link } from 'react-router-dom';
function Sidebar() {
  return (
    <>
      <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Bootstrap Sidebar</h3>
        </div>

        <ul class="list-unstyled components">
            
            <li>
            <Link to="/dashboard">Dashboard</Link>
            </li>
            <li class="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Vehicle Management</a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li>
                     <Link to="/vehicle/vehicle-add">Add Vehicle</Link>
                    </li>
                    <li>
                    <Link to="/vehicle/vehicle-list">Vehicle List</Link>
                    </li>
                    
                </ul>
            </li>
           
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Area Management</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                <li>
                     <Link to="/area/create-area">Add Area</Link>
                    </li>
                    <li>
                    <Link to="/area/area-list">Area List</Link>
                    </li>
                </ul>
            </li>

            <li>
                <a href="#diverSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Driver Management</a>
                <ul class="collapse list-unstyled" id="diverSubmenu">
                <li>
                     <Link to="/driver/driver-add">Add Driver</Link>
                    </li>
                    <li>
                    <Link to="/driver/driver-list">Driver List</Link>
                    </li>
                </ul>
            </li>

            <li>
                <a href="#mappedSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Mapped Management</a>
                <ul class="collapse list-unstyled" id="mappedSubmenu">
                <li>
                     <Link to="">Mapped Driver</Link>
                    </li>
                    <li>
                    <Link to="">Mapped Vehicle</Link>
                    </li>
                </ul>
            </li>
           
            <li>
                <a href="#historySubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">History</a>
                <ul class="collapse list-unstyled" id="historySubmenu">
                <li>
                     <Link to="">Driver History</Link>
                    </li>
                    <li>
                    <Link to="">Vehicle History</Link>
                    </li>
                </ul>
            </li>

            <li>
            <Link to="/area/area-list">Change Password</Link>
            </li>
            <li>
            <Link to="/area/area-list">Logout</Link>
            </li>
        </ul>
    </nav>
    </>
  );
}

export default Sidebar;