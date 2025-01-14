import { MouseEventHandler, useState } from "react";
import useLocale from "../utils/useLocale";
import { AppBar, Box, Toolbar, Typography, Button, Menu, IconButton, Container, MenuItem, Avatar, Divider, Tooltip, Breadcrumbs } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from "@mui/icons-material/Menu";
import TranslateIcon from '@mui/icons-material/Translate';
import { ExpandMore, NavigateNext } from "@mui/icons-material";
import Link from "./Link";
import { NextRouter, useRouter } from "next/router";

const BreadcrumbFromURL = () => {
  const { t } = useLocale();
  const router: NextRouter = useRouter();
  const path: string = router.pathname;
  const breadcrumbs: string[] = path.split('/').filter(breadcrumb => breadcrumb != '[page]');
  const elements: MapID2URL[] = breadcrumbs.map(breadcrumb => {
    const position: number = path.indexOf(breadcrumb);
    let prefix = '/';
    if (position != 0)
      prefix = path.substring(0, position);
    let id: string = breadcrumb;
    if (breadcrumb == '') id = t.HOME;
    else if (breadcrumb == 'cv') id = t.CV;
    else if (breadcrumb == 'research') id = t.RESEARCH;
    else if (breadcrumb == 'history') id = t.RS_HISTORY;
    else if (breadcrumb == 'publications') id = t.PUBLICATIONS;
    else if (breadcrumb == 'talks') id = t.TALKS;
    else if (breadcrumb == 'tips') id = t.TIPS;
    else if (breadcrumb == 'repositories') id = t.REPOSITORIES;
    else if (breadcrumb == '[slug]') id = [router.query.slug].join('');
    else if (breadcrumb == 'page') id = `${t.PAGE} ${router.query.page}`;
    return {
      id: id,
      url: prefix + breadcrumb
    };
  });

  // no breadcrumbs for the top page
  if (path === '/') return (<></>);
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize='small' />}
      aria-label="breadcrumb"
    >
      {elements.map((element, index, array) => {
        if (index === array.length - 1) {
          return (
            <Typography variant='caption' key={element.id}>
              {element.id}
            </Typography>
          );
        } else if (element.id != '') {
          return (
            <Typography variant='caption' key={element.id}>
              <Link href={element.url}>
                {element.id}
              </Link>
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
}

const Header = ({ headerData, slug, existTranslation }: { headerData: HeaderData, slug: string, existTranslation: boolean }) => {
  const { locale, t } = useLocale();
  const pages: MapID2URL[] = [
    { id: t.HOME, url: '/' },
    { id: t.CV, url: '/cv' },
    { id: t.RESEARCH, url: '/research' },
    { id: t.TIPS, url: '/tips' },
    { id: t.REPOSITORIES, url: '/repositories' },
  ];
  const newTips: Post[] = locale === 'en' ? headerData.tips_en.slice(0, 6) : headerData.tips_ja.slice(0, 6);

  // for menu icon button
  const [anchorElNav, setAnchorElNav] = useState<EventTarget & HTMLButtonElement | null>(null);
  const handleOpenNavMenu: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu: MenuOnClose = () => {
    setAnchorElNav(null);
  };
  const handleMenuButtonOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorElNav(null);
  };
  const handleMenuLIOnClick: MouseEventHandler<HTMLLIElement> = (event) => {
    setAnchorElNav(null);
  };

  // for tips dropdown
  const [anchorElDropdown, setAnchorElDropdown] = useState<EventTarget & HTMLButtonElement | null>(null);
  const handleOpenDropdown: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorElDropdown(event.currentTarget);
  };
  const handleCloseDropdown: MenuOnClose = () => {
    setAnchorElDropdown(null);
  };
  const handleTipsOnClick: MouseEventHandler<HTMLLIElement> = (event) => {
    setAnchorElDropdown(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 1 }}>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>

            {/* Logo for medium size window */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <SchoolIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                So Chigusa
              </Typography>
            </Box>

            {/* Dropdown menu for small size window */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => {
                  return (
                    <Link key={page.id} href={page.url} color='inherit'>
                      <MenuItem onClick={handleMenuLIOnClick}>
                        <Typography textAlign="center" variant="button">{page.id}</Typography>
                      </MenuItem>
                    </Link>
                  );
                })}
              </Menu>
            </Box>

            {/* Logo for small size window */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mx: 'auto' }}>
              <SchoolIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                So Chigusa
              </Typography>
            </Box>

            {/* Menu for medium size window */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => {
                if (page.id === t.TIPS) {
                  return (
                    <Box key='tips'>
                      <Button
                        onClick={handleOpenDropdown}
                        endIcon={<ExpandMore />}
                        sx={{ my: 2, color: 'white' }}
                      >
                        {t.TIPS}
                      </Button>
                      <Menu
                        id='dropdown-appbar'
                        anchorEl={anchorElDropdown}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElDropdown)}
                        onClose={handleCloseDropdown}
                        // MenuListProps={{ onMouseLeave: handleCloseDropdown }}
                        sx={{
                          display: { xs: 'none', md: 'block' },
                        }}
                      >
                        {
                          newTips.map((post: any) => (
                            <Link key={post.slug} href={`/tips/${post.slug}`} color='inherit'>
                              <MenuItem
                                key={post.slug}
                                onClick={handleTipsOnClick}
                              >
                                <Typography textAlign="center">{post.frontMatter.title}</Typography>
                              </MenuItem>
                            </Link>
                          ))
                        }
                        <Divider />
                        <Link href='/tips' color='inherit'>
                          <MenuItem
                            key='more'
                            onClick={handleTipsOnClick}
                          >
                            <Typography textAlign="center">{t.SEE_MORE_TIPS}</Typography>
                          </MenuItem>
                        </Link>
                      </Menu>
                    </Box>
                  );
                } else {
                  return (
                    <Box key={page.id}>
                      <Link href={page.url} color='inherit'>
                        <Button
                          onClick={handleMenuButtonOnClick}
                          sx={{ my: 2, color: 'white' }}
                        >
                          {page.id}
                        </Button>
                      </Link>
                    </Box>
                  );
                }
              })}
            </Box>

            {/* translate button */}
            <Box sx={{ mr: 1 }}>
              {existTranslation === false ? (
                <IconButton
                  size="large"
                  aria-label="change language"
                  color="inherit"
                  disabled
                >
                  <TranslateIcon />
                </IconButton>
              ) : (
                <Link href='' query={slug === undefined ? {} : { slug: slug }} localeChange color="inherit">
                  <Tooltip title={t.TRANSLATE} placement="bottom" arrow>
                    <IconButton
                      size="large"
                      aria-label="change language"
                      color="inherit"
                    >
                      <TranslateIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
            </Box>

            {/* Avatar */}
            <Link href='https://twitter.com/SoChigusa' target='_blank'>
              <Tooltip title={t.FOLLOW_ME} placement="bottom" arrow>
                <Avatar alt="So Chigusa" src="/avatars/1.jpg" />
              </Tooltip>
            </Link>
          </Toolbar>
        </Container>
      </AppBar >

      <Container maxWidth='lg' sx={{ mb: 2, }}>
        <BreadcrumbFromURL />
      </Container>
    </>
  );
};

export default Header;
