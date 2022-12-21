import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Copyright from '../SignUp/Copyright';

const tiers = [
  {
    title: 'Бесплантый',
    price: '0',
    description: [
      'Минимальная поддержка',
      'Ежемесячные консультации',
      'Ограниченный доступ',
      'Белпочта',
    ],
    buttonText: 'Попробовать',
    buttonVariant: 'outlined',
  },
  {
    title: 'Персональный',
    subheader: 'Наиболее популярный',
    price: '15',
    description: [
      'Достаточная поддержка',
      'Ещенедельные консультации',
      'Доступ к службе поддержки',
      'Поддержка по эл. почте',
    ],
    buttonText: 'Присоединиться',
    buttonVariant: 'contained',
  },
  {
    title: 'Корпоративный',
    price: '30',
    description: [
      'Максимальная поддержка',
      'Ежедневные консультации',
      'Полный доступ ',
      'Поддержка по телефону',
    ],
    buttonText: 'Связаться с нами',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Компания',
    description: ['Команда', 'История', 'Связаться с нами', 'Адреса'],
  },
  {
    title: 'Особенности',
    description: [
      'Персонал',
      'Случайная особенность',
      'Командная особенность',
      'Персонал разработчкиков',
      'Еще один',
    ],
  },
  {
    title: 'Источники',
    description: ['Источник', 'Имя источника', 'Еще один источник', 'Последний'],
  },
  {
    title: 'Лицензия',
    description: ['Политика приватности', 'Условия использования'],
  },
];

function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Цены
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Если капитализм играет по правилам, профсоюзы должны существовать. Если можно использовать
          в качестве капитала свои идеи и ресурсы своей страны, значит, можно использовать в
          качестве капитала свой труд.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}>
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /мес
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant as 'outlined' | 'contained'}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function About() {
  return <PricingContent />;
}
