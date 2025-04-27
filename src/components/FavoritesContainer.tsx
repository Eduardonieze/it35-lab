import { useState, useEffect } from 'react';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonText,
  IonLoading,
  IonToggle,
  IonItem,
  IonList
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';

interface AnimeFavorite {
  favorite_id: string;
  user_id: string;
  username: string;
  anime_title: string;
  anime_image: string | null;
  rating: number;
  notes: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const FavoritesContainer = () => {
  const [favorites, setFavorites] = useState<AnimeFavorite[]>([]);
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeImage, setAnimeImage] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        
        setUser(user);
        
        if (user) {
          const { data, error } = await supabase
            .from('anime_favorites')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
            
          if (error) throw error;
          
          setFavorites(data || []);
        }
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddFavorite = async () => {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    if (!animeTitle.trim()) {
      setError('Anime title is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('anime_favorites')
        .insert([{
          user_id: user.id,
          username: user.email || 'anonymous', // Use email as username
          anime_title: animeTitle,
          anime_image: animeImage || null,
          rating: rating || 0,
          notes: notes || null,
          is_public: isPublic
        }])
        .select();

      if (error) throw error;

      if (data) {
        setFavorites([data[0], ...favorites]);
        setAnimeTitle('');
        setAnimeImage('');
        setRating(0);
        setNotes('');
        setIsPublic(false);
      }
    } catch (err: any) {
      console.error('Error adding favorite:', err);
      setError(err.message || 'Failed to add favorite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={true}>
        <IonLoading isOpen={loading} message={loading ? "Processing..." : undefined} />

        {/* Add New Favorite Form */}
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--ion-background-color)' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Add New Favorite</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {/* Keep all your existing form inputs */}
              <IonLabel position="stacked">Anime Title*</IonLabel>
              <IonInput 
                value={animeTitle} 
                onIonChange={(e) => setAnimeTitle(e.detail.value!)} 
                placeholder="Enter anime title"
                className={error && !animeTitle.trim() ? 'ion-invalid' : ''}
              />

              <IonLabel position="stacked">Image URL (optional)</IonLabel>
              <IonInput 
                value={animeImage} 
                onIonChange={(e) => setAnimeImage(e.detail.value!)} 
                placeholder="Enter image URL" 
              />

              <IonLabel position="stacked">Rating (0-5)</IonLabel>
              <IonInput 
                type="number" 
                value={rating} 
                onIonChange={(e) => setRating(Number(e.detail.value) || 0)} 
                min="0" 
                max="5"
                placeholder="Enter rating"
              />

              <IonLabel position="stacked">Your Notes</IonLabel>
              <IonInput 
                value={notes} 
                onIonChange={(e) => setNotes(e.detail.value!)} 
                placeholder="Enter your notes" 
              />

              <IonItem>
                <IonLabel>Make this public</IonLabel>
                <IonToggle 
                  checked={isPublic} 
                  onIonChange={(e) => setIsPublic(e.detail.checked)} 
                />
              </IonItem>

              {error && (
                <IonText color="danger" className="ion-padding">
                  <p>{error}</p>
                </IonText>
              )}

              <IonButton 
                expand="block" 
                onClick={handleAddFavorite}
                disabled={loading}
                className="ion-margin-top"
              >
                ADD TO FAVORITES
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Favorites List */}
        <IonList style={{ marginTop: '16px' }}>
          {favorites.length === 0 ? (
            <IonItem>
              <IonText color="medium" className="ion-text-center">
                <p>No favorites yet. Add your first one above!</p>
              </IonText>
            </IonItem>
          ) : (
            favorites.map((favorite) => (
              <IonCard key={favorite.favorite_id} style={{ margin: '12px 0' }}>
                <IonCardHeader>
                  <IonCardTitle>{favorite.anime_title}</IonCardTitle>
                  <IonText>
                    <p>Added by: {favorite.username}</p>
                    <p>{favorite.is_public ? 'Public' : 'Private'}</p>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  {favorite.anime_image && (
                    <img 
                      src={favorite.anime_image} 
                      alt={favorite.anime_title}
                      style={{ 
                        maxWidth: '100%', 
                        height: 'auto',
                        borderRadius: '8px',
                        marginBottom: '12px'
                      }}
                    />
                  )}
                  <p>Rating: {favorite.rating}/5</p>
                  {favorite.notes && <p>Notes: {favorite.notes}</p>}
                  <IonText color="medium">
                    <small>Added on: {new Date(favorite.created_at).toLocaleDateString()}</small>
                  </IonText>
                </IonCardContent>
              </IonCard>
            ))
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FavoritesContainer;