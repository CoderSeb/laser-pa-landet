import React from 'react'
import TextField from '../../styled/TextField'
import PageContainer from '../../styled/PageContainer'

const diagnoser = [
      'Allergi',
      'Ansiktsförlamning',
      'Artros',
      'Bensår',
      'Bihåleinflammation',
      'Depression',
      'Diskbråck',
      'Eksem',
      'Fibromyalgi',
      'Frusen axel',
      'Herpes',
      'Huvudvärk',
      'Hälseneinflammation',
      'Hälsporre',
      'IBS',
      'Ischias',
      'Karpaltunnelsyndrom',
      'Lymfödem',
      'Mensvärk',
      'Migrän',
      'Morbus crohn/ ulcerös colit',
      'Musarm',
      'Muskelsträckning',
      'Nervskador',
      'Psoriasis',
      'Reumatism',
      'Restless legs',
      'Rosacea',
      'Sekretorisk otit',
      'Slemsäcksinflammation',
      'Spinal stenos',
      'Tennisarmbåge',
      'Hypotyreos',
      'Utmattningssyndrom',
      'Whiplash',
      'Åderbråck'
]

const Treatments = () => {
  return (
    <PageContainer>
    <TextField><h3>Vad är Medicinsk Laser?</h3>
      <hr />
      En laser är en ljuskälla, som en lampa. Alla ljuskällor har sitt eget spektrum av olika våglängder (färger).<br />Lasern avger ljus med ett mycket smalt spektrum, vilket innebär att det är strikt enfärgat. Laserljuset går in på cellnivå i kroppen och &quot;ställer tillrätta&quot; obalans och skada genom att markant öka cellens ämnesomsättning och på så sätt hjälper laserljuset kroppen att läka (sig själv).<br /><br />

      Medicinsk laser innebär att man använder sig av laserljus med lägre styrka, som är icke brännande. Metoden bygger inte på värmeutveckling som man kanske kan tro utan på fotobiologiska och fotokemiska mekanismer.

      Medicinsk laser är en vetenskaplig behandlingsmetod som har använts inom sportmedicinen i ca 20 år. Behandlingen är fri från kontraindikationer och biverkningar. Beprövat och tryggt.<br />

      Laserbehandling går utmärkt att kombinera med medicinering, pacemaker, implantat etc.<br /><br />

      <strong>Hur går en behandling till?</strong><br />
      Initialt ges 5-6 behandlingar i följd. Efter första behandlingstillfället kan efter några timmar uppstå träningsvärkssmärta, detta är positivt då det visar att läkningsprocessen kommit igång. Behandlingen uppvisar mycket goda behandlingsresultat. Drick mycket vatten innan behandlingen och efter behandlingen.

      För att lasern ska fungera fullt ut och hjälpa kroppen läka ”rätt besvär” är det viktigt att kroppen får rätt förutsättningar att kunna läka sig.
      Där har kosten en central plats.
      Jag hjälper dig se över din kost, hjälper dig med kostplan och ger dig råd för hur du ska kunna optimera din hälsa och välmående. Om du har det önskemålet.<br/>
      <br />
      <strong>Vad kostar det?</strong><br />
      <p>750kr / 45 minuter -- 1000kr / 60 minuter</p>
      <p>Betalning sker smidigast via Swish, givetvis också kontant.</p>
      <br/><strong>Välkommen!</strong><br /></TextField>
    <TextField>
      <h3>Vilka diagnoser kan behandlas?</h3>
      Då man arbetar med att påverka celler och vävnad, så har medicinsk laser ett stort användningsområde.<br />Nedan är några exempel på diagnoser där laserbehandling givit resultat.
      <hr />
      <ul className="diagnosisList">
      {diagnoser.map(diagnos => {
        return (
          <li key={diagnos}>{diagnos}</li>
        )
      })}
      </ul>
    </TextField>
  </PageContainer>
  )
}

export default Treatments
