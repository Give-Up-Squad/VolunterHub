import React from 'react'

//div.classname and press tab for a shortcut, div# for id
// all functions have to be capital letter
//https://www.w3schools.com/react/react_css.asp

const websiteLinks = [
  "Home",
  "About",
  "Login"
];

function Navbar(Links) {

  return (
    <div>
        <section>
          <ul>
            {websiteLinks.map((link) =>(
              <li style={{color:"red"}}>{link}</li>))}
          </ul>
        </section>
    </div>
  )
}
function NavbarLinks(links){

}


export default Navbar;