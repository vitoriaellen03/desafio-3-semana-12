import React from "react";
import HeaderNavBar from '../Header/components/HeaderNavBar.tsx';
import HeaderMain from '../Header/components/HeaderMain.tsx';

const Header = () => {
  return (
    <header className="c-header" id="c-header">
      <HeaderNavBar />
      <HeaderMain />
    </header>
  );
};

export default Header;

// import React from "react";

// const Header: React.FC = () => {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <HeaderNavBar />
//           <li><a href="/">Home</a></li>
//           <li><a href="/kanban">Kanban</a></li>
//           <li><a href="/profile">Profile</a></li>
//         </ul>
//       </nav>
//       <div>
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </div>
//     </header>
//   );
// };

// export default Header;
