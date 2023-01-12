import React from 'react';
import { Navigate } from 'react-router';
import '../../components/roleSelection/roleSelection.css';
import { useGameId } from '../../hooks/useGameId';
import { useUserRole } from '../../hooks/useUserRole';
import Header from '../../components/header/Header';
import RoleSelectionContent from '../../components/roleSelection/RoleSelectionContent';
import Footer from '../../components/pageFooter/Footer';
import * as paths from "../../constants/urls";

const RoleSelectionPage = () => {
  const { gameId } = useGameId();
  const { role } = useUserRole();

  return role ? (
    <Navigate to={paths.gameRoomUrl(gameId)} replace />
  ) : (
    <div className='f-column-between error-screen role-selection-screen'>
      <Header />
      <RoleSelectionContent />
      <Footer />
    </div>
  )

};

export default RoleSelectionPage;