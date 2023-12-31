import { Interpolation, Theme } from '@emotion/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { Image } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';
import { User } from '../util/database';
import { fadeIn } from '../variants';

type Props = {
  userObject?: User;
};

function Anchor({
  children,
  ...restProps
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  css?: Interpolation<Theme>;
}) {
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <motion.nav
      variants={fadeIn('down')}
      initial="initial"
      animate="animate"
      className="header"
    >
      <div id={styles.menuToggle}>
        <input type="checkbox" />
        <span />
        <span />
        <span />
        <ul id={styles.menu}>
          {/* <Link href="/">
            <a>Home</a>
          </Link> */}
          <Link href="/ourStory">
            <a>OUR STORY</a>
          </Link>
          <div className={styles.sliderLine} />
          <Link href="/studentVisa">
            <a>STUDENT VISA</a>
          </Link>
          <Link href="/studentInsurance">
            <a>STUDENT INSURANCE</a>
          </Link>
          <Link href="/housing">
            <a>HOUSING</a>
          </Link>
        </ul>
      </div>
      <div className={styles.navBarContainer}>
        <div className={styles.logo}>
          <Link href="/" passHref>
            <a>HOME</a>
          </Link>
        </div>
        {/* <div className={styles.navBar}> */}
        <Link href="/posts">
          <a>READ POSTS</a>
        </Link>
        {!props.userObject && (
          <li className={styles.myProfileHidden}>
            <Link href="/createPost">
              <a>CREATE A POST</a>
            </Link>
          </li>
        )}
        {props.userObject && (
          <Link href="/createPost">
            <a>CREATE A POST</a>
          </Link>
        )}
        {!props.userObject && (
          <li className={styles.myProfileHidden}>
            <Link href="/users/protected-user">
              <a>MY PROFILE</a>
            </Link>
          </li>
        )}
        {props.userObject && (
          <Link href="/users/protected-user">
            <a>MY PROFILE</a>
          </Link>
        )}
        <div className={styles.usernameSpace} />
        {props.userObject ? (
          <Anchor href="/logout">LOGOUT</Anchor>
        ) : (
          <>
            <Link href="/login">
              <a>LOGIN</a>
            </Link>
            <Link href="/register">
              <a>REGISTER</a>
            </Link>
          </>
        )}
        {props.userObject && (
          <>
            <div className={styles.username}>
              {props.userObject.username} ✌️
            </div>
            <div>
              <Image
                className={styles.userPhotoInHeader}
                src={props.userObject.image}
              />
            </div>
          </>
        )}
        {/* </div> */}
      </div>
    </motion.nav>
  );
}
