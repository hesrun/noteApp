import PageTitle from '../ui/PageTitle';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import usePersons from '../hooks/usePersons.js';
import { LuPlus } from 'react-icons/lu';
import AddPersonModal from '../components/modals/AddPersonModal.jsx';
import personsStore from '../stores/personsStore.js';
import { observer } from 'mobx-react-lite';
import PersonCap from '../components/caps/PersonCap.jsx';
import { useMediaQuery } from '@uidotdev/usehooks';
import PersonsCards from '../components/Persons/PersonsCards.jsx';
import PersonsTable from '../components/Persons/PersonsTable.jsx';

const Persons = observer(({ name }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const { getPersons, removePerson } = usePersons();
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');

    useEffect(() => {
        getPersons();
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedPerson(null);
        }
    }, [isModalOpen]);

    return (
        <>
            {personsStore.persons?.length > 0 ? (
                <>
                    <PageTitle>{name}</PageTitle>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full max-w-60"
                        color="cyan"
                        variant="solid"
                        icon={<LuPlus />}
                    >
                        Add new Person
                    </Button>
                    {isSmallDevice ? (
                        <PersonsCards
                            data={personsStore.persons}
                            removePerson={removePerson}
                            setIsModalOpen={setIsModalOpen}
                            setSelectedPerson={setSelectedPerson}
                        />
                    ) : (
                        <PersonsTable
                            data={personsStore.persons}
                            loading={personsStore.loading}
                            removePerson={removePerson}
                            setIsModalOpen={setIsModalOpen}
                            setSelectedPerson={setSelectedPerson}
                        />
                    )}
                </>
            ) : (
                <PersonCap capClick={setIsModalOpen} />
            )}

            <AddPersonModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={selectedPerson}
            />
        </>
    );
});

export default Persons;
