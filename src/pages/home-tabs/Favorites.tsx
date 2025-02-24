import { 
    IonButtons,
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  const Favorites: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
        () {
 (
    <body><IonCard>
                  <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png"/>
                  <IonCardHeader>
                    <IonCardTitle>Card Title</IonCardTitle>
                    <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                </IonCard><IonCard>
                    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                    <IonCardHeader>
                      <IonCardTitle>Card Title</IonCardTitle>
                      <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                  </IonCard></body>
  )
}
export default Example;
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          Favorites
        </div>
        </IonContent>
      </IonPage>
    );
  };
  export default Favorites;