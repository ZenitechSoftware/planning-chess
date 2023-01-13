import React from 'react';
import { Navigate } from 'react-router';
import '../../components/roleSelection/roleSelection.css';
import Header from '../../components/header/Header';
import RoleSelectionContent from '../../components/roleSelection/RoleSelectionContent';
import Footer from '../../components/pageFooter/Footer';
import * as paths from "../../constants/urls";
import { useUserContext } from '../../contexts/UserContext';

const RoleSelectionPage = () => {
  const userContext = useUserContext();

  return userContext.role ? (
    <Navigate to={paths.gameRoomUrl(userContext.gameId)} replace />
  ) : (
    <div className='f-column-between role-selection-screen'>
      <Header />
      <RoleSelectionContent />
      <Footer />
    </div>
  )

};

export default RoleSelectionPage;