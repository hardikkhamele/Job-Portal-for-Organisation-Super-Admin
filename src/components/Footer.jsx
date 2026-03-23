const Footer = () => {
     return (
        <footer className="fixed bottom-0 left-[310px] w-[calc(100%-300px)] bg-white text-gray-500 text-sm py-3 text-center border-t border-gray-200">
         <p>© {new Date().getFullYear()} TechnoHire. All rights reserved.</p>
       </footer>
     );
   };
   
   export default Footer;