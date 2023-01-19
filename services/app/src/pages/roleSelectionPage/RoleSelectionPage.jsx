import React from 'react';
import { Navigate } from 'react-router';
import RoleSelectionContent from '../../components/roleSelection/RoleSelectionContent';
import { useUserContext } from '../../contexts/UserContext';
import { buildPathFromTemplate, ROUTES } from '../routes';
import DarkLayout from '../../components/pageLayout/DarkLayout';

const RoleSelectionPage = () => {
  const userContext = useUserContext();

  return userContext.role ? (
    <Navigate to={buildPathFromTemplate(ROUTES.game, {id: userContext.gameId})} replace />
  ) : (
    <DarkLayout>
      <RoleSelectionContent />
    </DarkLayout>
  )

};

export default RoleSelectionPage;