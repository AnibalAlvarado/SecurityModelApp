import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import PersonList from '../screens/Person/PersonList';
import FormList from '../screens/Form/FormList';
import PersonStackNavigator from '../stacks/PersonStackNavigator';
import FormStackNavigator from '../stacks/FormStackNavigator';
import RolStackNavigator from '../stacks/RolStackNavigator';
import ModuleList from '../screens/Module/ModuleList';
import ModuleStackNavigator from '../stacks/ModuleStackNavigator';
// import UserList from '../screens/UserList';
// import RolList from '../screens/RolList';
// Añade tus otras vistas aquí
// import ModuleList from '../screens/ModuleList';
// import PermissionList from '../screens/PermissionList';
// import RolUserList from '../screens/RolUserList';
// import RolFormPermissionList from '../screens/RolFormPermissionList';

const Drawer = createDrawerNavigator();

const SidebarNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Person">
      <Drawer.Screen name="Person" component={PersonStackNavigator} />
      <Drawer.Screen name="Formularios" component={FormStackNavigator} />
      <Drawer.Screen name="Roles" component={RolStackNavigator} />
      <Drawer.Screen name="Módulos" component={ModuleStackNavigator} />
      {/* <Drawer.Screen name="Usuarios" component={UserList} />
      <Drawer.Screen name="Permisos" component={PermissionList} />
      <Drawer.Screen name="Form-Module" component={RolFormPermissionList} />
      <Drawer.Screen name="Rol-Usuario" component={RolUserList} /> */}
    </Drawer.Navigator>
  );
};

export default SidebarNavigator;