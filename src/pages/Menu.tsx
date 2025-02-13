import { 
    IonButtons,
      IonContent, 
      IonHeader, 
      IonIcon, 
      IonItem, 
      IonMenu, 
      IonMenuButton,
      IonMenuToggle,  
      IonPage, 
      IonRouterOutlet, 
      IonSplitPane, 
      IonTitle, 
      IonToolbar 
    } from '@ionic/react'
    import {homeOutline, rocketOutline} from 'ionicons/icons';
  import { Redirect, Route } from 'react-router';
  import Home from './Home';
  import About from './About';
  
  const Menu: React.FC = () => {    const path = [
    {name:'Home', url: '/it35-lab/app/Home', icon: homeOutline},
    {name:'About', url: '/it35-lab/app/About', icon: rocketOutline},
]

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Menu;