import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonButton
  } from '@ionic/react';
  
  import React from 'react';
  import { useLocation  } from 'react-router-dom';
  import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { logout } from '../firebase/config';
 
  
  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }
  
  const appPages: AppPage[] = [
    {
      title: 'Home',
      url: '/home',
      iosIcon: mailOutline,
      mdIcon: mailSharp
    },
    {
      title: 'Cuestionarios',
      url: '/cuestionario/lista',
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp
    },
    {
      title: 'Nuevo Cuestionario',
      url: '/cuestionario/detalle',
      iosIcon: heartOutline,
      mdIcon: heartSharp
    }
  ];
  
  
  const Menu: React.FC = () => {
    const location = useLocation();
    
    const handleLogout = () => {
        let lo = logout(); 
        if(lo){
            localStorage.setItem('isAuth', "")
            
            window.location.reload(); //detectar cambios del local storage
        }
    }

    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>Cuestionarios App</IonListHeader>
            <IonNote>cuestionariosapp@gmail.com</IonNote>
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
            <IonButton onClick={handleLogout} > Cerrar Sesión </IonButton>
          </IonList>
  
          
        </IonContent>
      </IonMenu>
    );
  };
  
  export default Menu;