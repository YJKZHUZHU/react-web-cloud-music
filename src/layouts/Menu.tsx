import React,{FC} from 'react'
import styles from './index.scss'
import {Icon} from "antd"
import NavLink from 'umi/navlink'


const Menu:FC = props => {
  return (
    <aside>
      <div className={styles.menu}>
        <div className={styles.recommend}>
          <h2>推荐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink
                to='/recommend/findMusic'
                activeClassName={styles.activeRouter}>
                <Icon type="customer-service" className={styles.icon}/>
                <span>发现音乐</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/recommend/fm' activeClassName={styles.activeRouter}>
                <Icon type="wifi" className={styles.icon}/>
                <span>私人FM</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/recommend/video' activeClassName={styles.activeRouter}>
                <Icon type="play-circle" className={styles.icon}/>
                <span>视频</span>
              </NavLink>

            </li>
            <li>
              <NavLink to='/recommend/friend' activeClassName={styles.activeRouter}>
                <Icon type="team" className={styles.icon}/>
                <span>朋友</span>
              </NavLink>
            </li>

          </ul>
        </div>
        <div className={styles.myMusic}>
          <h2>我的音乐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink to='/myMusic/cloud' activeClassName={styles.activeRouter}>
                <Icon type="cloud" className={styles.icon}/>
                <span>我的音乐云盘</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/myMusic/collect' activeClassName={styles.activeRouter}>
                <Icon type="usergroup-add" className={styles.icon}/>
                <span>我的收藏</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.recommend}>
        <h2>推荐</h2>
        <ul className={styles.list}>
          <li>
            <NavLink
              to='/recommend/findMusic'
              activeClassName={styles.activeRouter}>
              <Icon type="customer-service" className={styles.icon}/>
              <span>发现音乐</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/recommend/fm' activeClassName={styles.activeRouter}>
              <Icon type="wifi" className={styles.icon}/>
              <span>私人FM</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/recommend/video' activeClassName={styles.activeRouter}>
              <Icon type="play-circle" className={styles.icon}/>
              <span>视频</span>
            </NavLink>

          </li>
          <li>
            <NavLink to='/recommend/friend' activeClassName={styles.activeRouter}>
              <Icon type="team" className={styles.icon}/>
              <span>朋友</span>
            </NavLink>
          </li>

        </ul>
      </div>
        <div className={styles.myMusic}>
          <h2>我的音乐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink to='/myMusic/cloud' activeClassName={styles.activeRouter}>
                <Icon type="cloud" className={styles.icon}/>
                <span>我的音乐云盘</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/myMusic/collect' activeClassName={styles.activeRouter}>
                <Icon type="usergroup-add" className={styles.icon}/>
                <span>我的收藏</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.recommend}>
          <h2>推荐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink
                to='/recommend/findMusic'
                activeClassName={styles.activeRouter}>
                <Icon type="customer-service" className={styles.icon}/>
                <span>发现音乐</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/recommend/fm' activeClassName={styles.activeRouter}>
                <Icon type="wifi" className={styles.icon}/>
                <span>私人FM</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/recommend/video' activeClassName={styles.activeRouter}>
                <Icon type="play-circle" className={styles.icon}/>
                <span>视频</span>
              </NavLink>

            </li>
            <li>
              <NavLink to='/recommend/friend' activeClassName={styles.activeRouter}>
                <Icon type="team" className={styles.icon}/>
                <span>朋友</span>
              </NavLink>
            </li>

          </ul>
        </div>
        <div className={styles.myMusic}>
          <h2>我的音乐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink to='/myMusic/cloud' activeClassName={styles.activeRouter}>
                <Icon type="cloud" className={styles.icon}/>
                <span>我的音乐云盘</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/myMusic/collect' activeClassName={styles.activeRouter}>
                <Icon type="usergroup-add" className={styles.icon}/>
                <span>我的收藏</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.recommend}>
          <h2>推荐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink
                to='/recommend/findMusic'
                activeClassName={styles.activeRouter}>
                <Icon type="customer-service" className={styles.icon}/>
                <span>发现音乐</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/recommend/fm' activeClassName={styles.activeRouter}>
                <Icon type="wifi" className={styles.icon}/>
                <span>私人FM</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/recommend/video' activeClassName={styles.activeRouter}>
                <Icon type="play-circle" className={styles.icon}/>
                <span>视频</span>
              </NavLink>

            </li>
            <li>
              <NavLink to='/recommend/friend' activeClassName={styles.activeRouter}>
                <Icon type="team" className={styles.icon}/>
                <span>朋友</span>
              </NavLink>
            </li>

          </ul>
        </div>
        <div className={styles.myMusic}>
          <h2>我的音乐</h2>
          <ul className={styles.list}>
            <li>
              <NavLink to='/myMusic/cloud' activeClassName={styles.activeRouter}>
                <Icon type="cloud" className={styles.icon}/>
                <span>我的音乐云盘</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/myMusic/collect' activeClassName={styles.activeRouter}>
                <Icon type="usergroup-add" className={styles.icon}/>
                <span>我的收藏</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Menu
