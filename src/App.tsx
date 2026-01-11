import styles from './App.module.css'
import { Card } from "./components/Card.tsx";
import items from './items.ts'
import type { project } from "./common/types.ts";
import { useState } from "react";
import { Dialog } from "./components/Dialog.tsx";
import { GithubIcon, KofiIcon, DiscordIcon } from "./svg.ts";
import { ContactLink } from "./components/ContactLink.tsx";

function App() {
    const [selectedProject, setSelectedProject] = useState<project | null>(null);

    return (
        <div>
            {selectedProject && <Dialog item={selectedProject}
                                        close={() => setSelectedProject(null)} />}

            <header className={styles.header}>
                <h1>Fawaz Takahji</h1>

                <nav>
                    <a href="#projects">Software Projects</a>
                    <a href="#mods">Game Mods</a>
                </nav>
            </header>
            <div className={styles.container}>
                <p className={styles.introText}>
                    Here you'll find my software development projects and the mods I've created for various games.
                </p>

                <section id="projects" className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        Software Projects
                    </h2>
                    <div className={styles.grid}>
                        {items.software.map((item, index) => (
                            <Card key={index}
                                  item={item}
                                  setSelectedProject={setSelectedProject} />
                        ))}
                    </div>
                </section>

                <section id="mods" className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        Game Mods
                    </h2>
                    {items.mods.map((item, index) => {
                        return (
                            <section key={index} className={styles.section}>
                                <div className={styles.subsectionTitle}>
                                    <h3>
                                        <img src={item.icon}
                                             alt="&#10006;" />
                                        {item.title}
                                    </h3>
                                </div>
                                <div className={styles.grid}>
                                    {item.projects.map((project, index) => (
                                        <Card key={index}
                                              item={project}
                                              setSelectedProject={setSelectedProject} />
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </section>
            </div>

            <footer className={styles.footer}
                    id="footer">
                <div className={styles.footerLinks}>
                    <ContactLink link="https://github.com/FawazTakahji"
                                 text="FawazTakahji"
                                 icon={GithubIcon} />

                    <ContactLink link="https://ko-fi.com/fawaztk"
                                 text="fawaztk"
                                 icon={KofiIcon} />

                    <ContactLink link="https://discord.com/users/228825096360296448"
                                 text="pardofelis."
                                 icon={DiscordIcon} />
                </div>
            </footer>
        </div>
    )
}

export default App
