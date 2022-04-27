import React, { useState } from 'react'
import './App.css';
import Menu from './component/Menu';
import T_User from "./component/T_User";
import T_GlobalBeneficiary from "./component/T_GlobalBeneficiary";
import T_BeneficiaryDocuments from "./component/T_BeneficiaryDocuments";

function App() {
  return (
      <div>
          <Menu/>
          <T_User/>
          <T_GlobalBeneficiary/>
          <T_BeneficiaryDocuments/>
      </div>
  );
}

export default App;
