import { format } from 'date-fns';
import Footer from '../components/Footer';
import { getSearchResult } from '../utils/api';
import { SearchResultData } from '../types/app';
import ListingCard from '../components/ListingCard';
import Header from '../components/Header/Header';
import Map from '../components/Map';

type SearchParams = {
    location: string;
    startDate: string;
    endDate: string;
    numOfGuests: string;
};
const SearchResult = async ({
    searchParams: { location, startDate, endDate, numOfGuests },
}: {
    searchParams: SearchParams;
}) => {
    let formattedStartDate;
    let formattedEndDate;
    if (startDate && endDate) {
        formattedStartDate = format(new Date(startDate), 'dd MMMM yy');
        formattedEndDate = format(new Date(endDate), 'dd MMMM yy');
    }
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    const filters = [
        'Cancellation Flexibility',
        'Type of Place',
        'Price',
        'Rooms and Beds',
        'More filters',
    ];
    const searchResultData: SearchResultData = await getSearchResult();

    return (
        <>
            <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
            <main>
                <section>
                    <div className='container flex'>
                        <div className='pt-14 pr-4'>
                            <p className='text-xs'>
                                300+ Stays - {range} - for {numOfGuests} guests
                            </p>
                            <h1 className='text-3xl font-semibold mt-2 mb-6 '>
                                Stays in {location}
                            </h1>
                            <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                                {filters.map((filter) => (
                                    <button type='button' className='filter-btn' key={filter}>
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <div>
                                {searchResultData.map((listing) => (
                                    <ListingCard
                                        key={listing.title}
                                        img={listing.img}
                                        title={listing.title}
                                        location={listing.location}
                                        description={listing.description}
                                        price={listing.price}
                                        total={listing.total}
                                        star={listing.star}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='hidden xl:inline-flex xl:min-w-[600px]'>
                            <Map searchResultData={searchResultData} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default SearchResult;