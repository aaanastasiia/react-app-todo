import React from 'react';
import styles from './About.module.css';
import { Octokit } from '@octokit/rest';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import noRep from './img/norep.png';
import classnames from 'classnames';

const octokit = new Octokit();

class About extends React.Component {
    state = {
        isUserLoading: true,
        isRepoLoading: true,
        repoList: [],
        infoUser: {},
        isUserError: false,
        isRepoError: false,
        firstRepo: 0,
        lastRepo: 4
    }

    lastPage = () => {
        this.setState({
            firstRepo: this.state.firstRepo - 4,
            lastRepo: this.state.lastRepo - 4
        });
    };

    nextPage = () => {
        this.setState({
            firstRepo: this.state.firstRepo + 4,
            lastRepo: this.state.lastRepo + 4
        });
    };

    componentDidMount() {
        octokit.repos.listForUser({
            username: 'aaanastasiia'
        }).then(({ data }) => {
            this.setState({
                repoList: data,
                isUserLoading: false
            });
        })
          .catch(error => {
              this.setState({
                isUserLoading: false,
                isUserError: true,
                error: error.message
            });
          });

        octokit.users.getByUsername({
            username: 'aaanastasiia'
          }).then(({ data }) => {
              this.setState({
                  infoUser: data,
                  isRepoLoading: false
              });
          })
          .catch(error => {
            this.setState({
                isRepoLoading: false,
              isRepoError: true,
              error: error.message
          });
        });
    }

    render() {
        const { isUserLoading, isRepoLoading, repoList, infoUser, isUserError, isRepoError, firstRepo, lastRepo } = this.state;
        const repoListPage = repoList.slice(firstRepo, lastRepo);
        return (
            <div>
                <Card classes={{ root: styles.user__wrap }}>
                    {isUserLoading ? <div className={styles.prelouder__wrap}><CircularProgress /></div> :
                        <div>
                            { isUserError ? <Alert severity="error">SORRY, THE PAGE NOT FOUND</Alert> :
                                <div>
                                    <div className={styles.user}>
                                        <img alt='/' src={infoUser.avatar_url} className={styles.avatar}></img>
                                            <div className={styles.user__info}>
                                                <h3 className={styles.user__name}>{infoUser.name}</h3>
                                                <span className={styles.user__bio}>{infoUser.bio}</span>
                                                <div className={styles.info__contacts}>
                                                    <a href="mailto: an.anischik@gmail.com" className={styles.mail__href} target="_blank" rel="noopener noreferrer">
                                                        <svg width="16" height="16" fill="#999" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                                                            <path d="M8.031 6.563c-.775 0-1.406.63-1.406 1.406 0 .775.63 1.406 1.406 1.406.776 0 1.406-.63 1.406-1.406 0-.776-.63-1.407-1.406-1.407z" fill="#999"/>
                                                            <path d="M7.969 0C3.575 0 0 3.575 0 7.969S3.575 16 7.969 16 16 12.363 16 7.969 12.363 0 7.969 0zm3.343 10.313a1.871 1.871 0 01-1.531-.8c-.43.486-1.051.8-1.75.8a2.346 2.346 0 01-2.344-2.344 2.346 2.346 0 012.344-2.344c.53 0 1.014.183 1.406.48v-.011a.468.468 0 11.938 0v2.343a.939.939 0 001.875 0c0-3.137-2.076-4.687-4.219-4.687a4.223 4.223 0 00-4.219 4.219 4.223 4.223 0 004.22 4.218c.937 0 1.823-.3 2.564-.868.494-.378 1.06.367.57.743a5.106 5.106 0 01-3.135 1.063 5.162 5.162 0 01-5.156-5.156 5.162 5.162 0 015.156-5.157c2.59 0 5.156 1.911 5.156 5.626 0 1.034-.84 1.874-1.874 1.874z"/>
                                                        </svg>
                                                        <span className={styles.mail}>an.anischik@gmail.com</span>
                                                    </a>
                                                    <a href="https://t.me/anastasiia_aaaa" className={styles.tg__href} target="_blank" rel="noopener noreferrer"> 
                                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="#999" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                                                            <path d='M0.282729 6.71437L3.96945 8.09037L5.39644 12.6795C5.48774 12.9735 5.84716 13.0821 6.08572 12.8871L8.14075 11.2118C8.35617 11.0362 8.66299 11.0275 8.88811 11.1909L12.5947 13.8819C12.8499 14.0674 13.2114 13.9276 13.2754 13.6192L15.9907 0.558373C16.0605 0.221519 15.7296 -0.059494 15.4088 0.0645593L0.278409 5.90141C-0.0949774 6.04541 -0.0917241 6.57405 0.282729 6.71437ZM5.16646 7.35789L12.3717 2.92019C12.5012 2.84067 12.6344 3.01576 12.5232 3.11891L6.57681 8.64637C6.3678 8.84093 6.23297 9.10131 6.19478 9.38392L5.99222 10.885C5.9654 11.0855 5.68385 11.1054 5.62854 10.9114L4.8495 8.17405C4.76028 7.86184 4.8903 7.52834 5.16646 7.35789Z'/>
                                                        </svg>
                                                        <span className={styles.phone}>+7 (916) 395-52-15</span>
                                                    </a>
                                                </div>                
                                            </div>
                                    </div>
                                    <div className={styles.social__media}>
                                        <a href="https://github.com/aaanastasiia" className={styles.github} target="_blank" rel="noopener noreferrer">
                                            <svg width="24" height="24" fill="#999" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                                                <path d="M22.39 6.27a11.947 11.947 0 00-4.367-4.367C16.184.83 14.177.293 12 .293c-2.177 0-4.185.537-6.023 1.61A11.946 11.946 0 001.609 6.27C.536 8.11 0 10.116 0 12.293c0 2.615.763 4.966 2.289 7.055 1.526 2.088 3.497 3.533 5.914 4.335.281.053.49.016.625-.109a.611.611 0 00.203-.468l-.008-.844c-.005-.531-.008-.995-.008-1.39l-.36.062c-.228.042-.517.06-.866.054a6.618 6.618 0 01-1.086-.109 2.427 2.427 0 01-1.047-.468 1.982 1.982 0 01-.688-.961l-.156-.36a3.904 3.904 0 00-.492-.796c-.224-.292-.45-.49-.68-.594l-.109-.078a1.146 1.146 0 01-.203-.188.859.859 0 01-.14-.219c-.032-.073-.006-.133.077-.18.084-.047.235-.07.454-.07l.312.047c.208.042.466.167.773.375.308.208.56.48.758.812.24.427.529.753.867.977.339.224.68.336 1.024.336.343 0 .64-.026.89-.078.25-.052.485-.13.703-.235.094-.698.35-1.234.766-1.61a10.705 10.705 0 01-1.602-.28 6.373 6.373 0 01-1.468-.61 4.207 4.207 0 01-1.258-1.047c-.333-.416-.607-.963-.82-1.64-.214-.678-.32-1.459-.32-2.344 0-1.26.411-2.333 1.234-3.219-.386-.948-.35-2.01.11-3.187.301-.094.75-.024 1.343.21.594.235 1.028.436 1.305.602.276.167.497.308.664.422.969-.27 1.969-.406 3-.406 1.03 0 2.031.136 3 .406l.594-.375c.406-.25.885-.479 1.437-.687.552-.208.974-.266 1.266-.172.468 1.177.51 2.24.125 3.187.822.886 1.234 1.959 1.234 3.22 0 .884-.107 1.668-.32 2.35-.214.683-.49 1.23-.828 1.641-.339.412-.76.758-1.266 1.04a6.388 6.388 0 01-1.469.608c-.474.126-1.007.22-1.601.282.541.469.812 1.208.812 2.219v3.296c0 .188.065.344.196.469.13.124.335.161.617.109 2.417-.802 4.388-2.247 5.914-4.336C23.237 17.26 24 14.907 24 12.293c0-2.177-.538-4.184-1.61-6.023z"/>
                                            </svg>
                                        </a>
                                        <a href="https://vk.com/id48588394" target="_blank" rel="noopener noreferrer">
                                            <svg width="24" height="24" fill="#999" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.087 14.298c.56.546 1.151 1.06 1.653 1.663.223.267.432.542.592.853.228.442.022.927-.374.953H17.5c-.635.052-1.14-.204-1.566-.638-.34-.346-.656-.716-.983-1.074a2.302 2.302 0 00-.443-.393c-.335-.218-.626-.152-.818.199-.196.356-.24.75-.26 1.147-.026.58-.201.731-.783.759-1.243.058-2.422-.13-3.518-.757-.967-.553-1.715-1.333-2.367-2.216-1.27-1.722-2.243-3.611-3.116-5.555-.197-.438-.053-.672.43-.681a68.422 68.422 0 012.407-.001c.326.005.542.192.668.5a14.94 14.94 0 001.631 3.023c.178.25.359.5.617.678.285.195.502.13.636-.187a2.06 2.06 0 00.142-.635c.064-.742.071-1.483-.04-2.222-.068-.462-.328-.76-.789-.848-.235-.045-.2-.131-.086-.266.198-.231.384-.375.755-.375h2.777c.438.086.536.282.596.723l.002 3.087c-.005.17.086.676.392.788.246.081.408-.116.555-.271.666-.707 1.14-1.541 1.565-2.405.188-.38.35-.775.507-1.17.117-.292.298-.435.628-.43l2.675.003c.078 0 .159 0 .237.014.45.077.574.271.434.71-.22.692-.646 1.267-1.063 1.844-.446.618-.923 1.214-1.365 1.835-.407.567-.375.852.13 1.345z"/>
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/anastasiia-anishchik-8509191a9/" target="_blank" rel="noopener noreferrer">
                                            <svg width="24" height="24" fill="#999" xmlns="http://www.w3.org/2000/svg" className={styles.icon}>
                                                <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zM8.513 18.14H5.59V9.349h2.923v8.793zM7.052 8.148h-.02c-.98 0-1.614-.675-1.614-1.518 0-.863.653-1.52 1.653-1.52s1.615.657 1.634 1.52c0 .843-.634 1.518-1.653 1.518zm11.999 9.994h-2.922v-4.704c0-1.182-.423-1.989-1.48-1.989-.808 0-1.289.544-1.5 1.07-.077.187-.096.45-.096.712v4.91H10.13s.039-7.967 0-8.792h2.923v1.245c.388-.6 1.083-1.451 2.633-1.451 1.923 0 3.365 1.256 3.365 3.957v5.042z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </Card>
                <Card classes={{ root: styles.user__wrap }}>
                    {isRepoLoading ? <div className={styles.prelouder__wrap}><CircularProgress /></div> :
                        <div> 
                            <h3 className={styles.norep__wrap_title}>Репозитории на github.com</h3>
                                { isRepoError 
                                    ? <div className={styles.norep__wrap}>
                                        <img alt='/' className={styles.norep__wrap_img} src={noRep}></img>
                                        <p className={styles.norep__wrap_text}>Что-то пошло не так...</p>
                                        <p className={styles.norep__wrap_tryAgain}>Попробуйте <a
                                            href='https://github.com'>загрузить</a> ещё раз</p>
                                    </div> 
                                    : <div className={styles.repo__wrap}>
                                                {repoList.length !== 0
                                                    ? <div> 
                                                        <ol className={styles.list}>
                                                            {repoListPage.map(repo => (<li key={repo.id} className={styles.item}>
                                                                <a href={repo.html_url} className={styles.repo}>{repo.name}</a>
                                                                <div className={styles.repo__info}>
                                                                    <span className={
                                                                        classnames({
                                                                            [styles.language]: true,
                                                                            [styles.html]: repo.language === 'HTML',
                                                                            [styles.css]: repo.language === 'CSS',
                                                                            [styles.js]: repo.language === 'JavaScript'                      
                                                                        })}>{repo.language}</span>
                                                                    <span className={styles.count}>{repo.stargazers_count}</span>
                                                                    <span className={styles.forks}>{repo.forks_count}</span>
                                                                    <span className={styles.data}>Updated on {new Date(repo.updated_at).toLocaleString('en-US', {
                                                                        day: 'numeric',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                    })}</span>
                                                                </div>
                                                            </li>))}
                                                        </ol>
                                                        <div className={styles.pagination}>
                                                            <button className={styles.pagination__button}
                                                                onClick={this.lastPage}
                                                                disabled={firstRepo < 4}>
                                                                    Назад
                                                            </button>
                                                            <button className={styles.pagination__button}
                                                                onClick={this.nextPage}
                                                                disabled={repoList.length < lastRepo}>
                                                                    Вперед
                                                            </button>
                                                        </div>
                                                    </div>
                                                        : <div className={styles.norep__wrap}>
                                                            <img alt='/' className={styles.norep__wrap_img} src={noRep}></img>
                                                            <p className={styles.norep__wrap_text}>Репозитории отсутствуют</p>
                                                            <p className={styles.norep__wrap_tryAgain}>Добавьте как минимум один репозиторий на<a
                                                                href='https://github.com'>github.com</a></p>
                                                        </div> 
                                                }
                                        </div>
                                }
                        </div>  
                    }
                </Card>
            </div>
        );
    }
}
     
export default About;