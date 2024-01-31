import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done(true));
Router.events.on('routeChangeError', () => NProgress.done(true));

const TopProgressBar = () => null;
export default TopProgressBar;
