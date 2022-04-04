import { useState, useEffect } from 'react';
import { Grid, Button, Typography, Container, CardActionArea } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from "react-router-dom";

const useStyles = makeStyles({

        listarivi : {
                        borderBottom : "solid 1px #ccc",
                        paddingBottom : "10px",
                        marginBottom : "20px"
                    },
                     card: {
                      minWidth: 275,
                      margin: "5px",
                    },
                    bullet: {
                      display: 'inline-block',
                      margin: '0 2px',
                      transform: 'scale(0.8)',
                    },
                    title: {
                      marginBottom: 16,
                      fontSize: 14,
                    },
                    pos: {
                      marginBottom: 12,
                    },
                    tag: {
                      float: "right",
                    }
    });

function Selaa(props) {
    //tämä osio voi olla erittäin raskasta luettavaa
    //painin localstorageen tallentamisen kanssa niin käsittämättömän
    //kauan että koodi on ihan sekaisin kaiken sen jäljiltä
    //kun yritin saada sitä toimimaan järkevästi
    //olisi varmaankin pitänyt hoitaa 20 per sivu printtaus jotenkin useEffectin avulla
    const tyylit = useStyles();

    //haetaan tiedosto
    const tiedot = require('./postimerkit.json');

    //liitetään dataarrayihin
    const [data, setData] = useState({
      postimerkit : tiedot,
    });
    
    //20 merkkiä per sivu muuttujat
    const [maara, setMaara] = useState(20);
    const [maara1, setMaara1] = useState(0);

    //aluksi meinasin props.history logiikalla jotenkin tehdä niin etteivät
    //muuttujat resettaisi jos arvo on PUSH
    //mutta en saanut järkeiltyä miten tämän tekisi

    //useeffectillä ekan kerran ladattaessa haetaan localstoragesta 
    //jotta ei mene nollille
    useEffect(() => {
      const check = localStorage.getItem("maara1");
      const check2 = localStorage.getItem("maara11");
      if (check){
      setMaara(parseInt(check));}
      if(check2){
      setMaara1(parseInt(check2));}
    }, []);

    //näytä tai älä näytä navigointipainikkeita
    const [showLast, setShowLast] = useState(false);
    const [showNext, setShowNext] = useState(true);

    //slicellä määrä muuttujien perusteella otetaan 20 kerrallaan
    let listaus = data.postimerkit.slice(maara1,maara);

    //useeffectillä asetetaan localstorageen ja iffillä määritetään näkyykö painike
    useEffect(() => { 
      localStorage.setItem("maara1", maara);
      localStorage.setItem("maara11", maara1);

    if(maara == 20){
      setShowLast(false);
    }
    if(maara == 2320){
      setShowNext(false);
    }
  }, [maara, maara1]);

  //lisätään tai vähennettään listauksesta
  function edelliset(){
    setShowNext(true);
    setMaara(maara-20);
    setMaara1(maara1-20);
  }
  function seuraavat(){
    setShowLast(true);
    setMaara(maara+20);
    setMaara1(maara1+20);
  }

  return (
    <Container style={{
                        paddingTop : "10px",
                     }}>

      {(showLast)
      ? <Button
      variant="contained"
      color="secondary"
      onClick={() => { edelliset() }}
      >
      Näytä edelliset 20 merkkiä
      </Button>  
      : ""
      }
      {(showNext)  
      ?<Button
        className={tyylit.tag}
        variant="contained"
        color="secondary"
        onClick={() => { seuraavat() }}
      >
        Näytä seuraavat 20 merkkiä
      </Button>
      : ""
      } 
      <Grid container spacing={24}>
        {listaus.map((lista) => {
        return (
                  <Grid key={lista.postimerkki_id} item xs={3} >
                    <Card className={tyylit.card} component={Link}
                        to={`/selaa/${lista.postimerkki_id}`}>
                      <CardActionArea >
                        <CardMedia
                        component="img"
                        height="140"
                        image={lista.kuvan_url}>
                        </CardMedia>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         {lista.merkin_nimi}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Ilmestymispäivä: {lista.ilmestymispaiva}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Nimellisarvo: {lista.nimellisarvo}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                         Valuutta: {lista.valuutta}
                        </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
      })}
      </Grid>
    </Container>
  );
}


export default Selaa;
