import { useState, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { ethers } from "ethers";
import { useContract, useAddress, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Loader from "@/components/Loader";
import CountdownTimer from "@/components/CountdownTimer";
import currency from "constants";


const Home: NextPage = () => {
    const address = useAddress();
    const [quantity, setQuantity] = useState<number>(1);
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
    const [userTickets, setUserTickets] = useState(0);


    const { data: expiration } = useContractRead(contract, "expiration");

    const { data: remainingTickets } = useContractRead(contract, "RemainingTickets");

    const { data: currentWinningReward } = useContractRead(contract, "CurrentWinningReward");

    const { data: ticketPrice } = useContractRead(contract, "ticketPrice");

    const { data: ticketCommission } = useContractRead(contract, "ticketCommission");

    const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets");

    const { data: tickets } = useContractRead(contract, "getTickets");

    const { data: winnings } = useContractRead(contract, "getWinningsForAddress", [address]);

    const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings");


    useEffect(() => {
        if (!tickets) return;

        const totalTickets: string[] = tickets;
        const noOfUserTickets = totalTickets.reduce(
            (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
            0
        );
        setUserTickets(noOfUserTickets);
    }, [tickets, address])

    const handleClick = async () => {
        if (!ticketPrice) return;

        const notification = toast.loading("Purchasing tickets...");
        try {
            const totalPrice = Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity;
            console.log("Total Price:", totalPrice);

            const parsedTotalPrice = ethers.utils.parseEther(totalPrice.toString());
            console.log("Parsed Total Price:", parsedTotalPrice.toString());

            const data = await BuyTickets([parsedTotalPrice]);

            toast.success(`Successfully purchased ${quantity} tickets.`, {
                id: notification,
            });

            console.info("Contract call success:", data);
        } catch (err) {
            toast.error("Whoops, something went wrong!", {
                id: notification,
            });
            console.error("Contract call failure:", err);
        }
    };

    const onWithdrawWinnings = async () => {
        const notification = toast.loading('Withdrawing your winnings...');

        try {
            const data = await WithdrawWinnings([{}]);

            toast.success("Winnings Withdrawn Successfully!", {
                id: notification,
            });

            console.info("Contract call success:", data);

        }

        catch (err) {
            toast.error("Whoops, something went wrong!", {
                id: notification,
            });

            console.error('Contract call failure', err);
        }
    };

    if (isLoading) return <Loader />;

    if (!address) return <Login />;

    return (
        <div className="bg-[#091B18] min-h-screen flex flex-col">
            <Head>
                <title>Lucky Draw</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex-1">
                <Header />

                {winnings > 0 && (
                    <div className='max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5'>
                        <button onClick={onWithdrawWinnings} className='p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full'>
                            <p className='font-bold font-poppins'>Winner Winner Chicken Dinner!</p>
                            <p className="font-poppins">Total Winnings: {ethers.utils.formatEther(winnings.toString())}{" "}
                                {currency}

                            </p>
                            <br />
                            <p className='font-semibold font-poppins'>Click here to withdraw</p>
                        </button>
                    </div>
                )}
                {/* The next draw box */}
                <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
                    <div className="stats-container">
                        <h1 className="text-3xl text-white font-semibold font-poppins text-center">
                            The next draw
                        </h1>
                        <div className="flex justify-between p-2 space-x-2">
                            <div className="stats">
                                <h2 className="text-sm">Total Pool</h2>
                                <p className="text-xl">{currentWinningReward && ethers.utils.formatEther(currentWinningReward.toString())}{" "} {currency}</p>
                            </div>
                            <div className="stats">
                                <h2 className="text-sm">Tickets Remaining</h2>
                                <p className="text-xl">{remainingTickets?.toNumber()}</p>
                            </div>
                        </div>

                        {/* Countdown timer */}
                        <div className="mt-5 mb-3">
                            <CountdownTimer />
                        </div>
                    </div>

                    {/* The price per ticket box */}
                    <div className="stats-container space-y-2">
                        <div className="stats-container">
                            <div className="flex justify-between items-center text-white font-poppins pb-2">
                                <h2>Price per ticket</h2>
                                <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "} {currency}</p>
                            </div>
                            <div className="flex text-white font-poppins items-center space-x-2 rounded-sm bg-[#091B18] border-[#004337] border p-4">
                                <p>Tickets</p>
                                <input
                                    className="flex w-full bg-transparent text-right outline-none"
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                />
                            </div>

                            <div className="space-y-2 mt-5">
                                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-poppins font-bold">
                                    <p>
                                        Total cost of tickets
                                    </p>
                                    <p>{ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}{" "} {currency}</p>

                                </div>

                                <div className="flex items-center justify-between text-emerald-300 text-xs italic font-poppins">
                                    <p>
                                        Service fees
                                    </p>
                                    <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{" "} {currency}</p>

                                </div>

                                <div className="flex items-center justify-between text-emerald-300 text-xs italic font-poppins">
                                    <p>
                                        Network fees
                                    </p>
                                    <p>
                                        TBC
                                    </p>
                                </div>
                            </div>


                            <button
                                disabled={
                                    expiration?.toString() < Date.now().toString() ||
                                    remainingTickets?.toNumber() === 0
                                }
                                onClick={handleClick}
                                className='mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 
                                        rounded-md text-white shadow-xl font-poppins disabled:from-gray-600
                                         disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed'
                            >
                                Buy {quantity} ticket(s) for {ticketPrice &&
                                    Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity}
                                {' '}
                                {currency}
                            </button>
                        </div>
                        {userTickets > 0 && (
                            <div className="stats">
                                <p className='text-lg mb-2 font-poppins'>
                                    You have {userTickets} Tickets in this draw
                                </p>
                                <div className='flex max-w-sm flex-wrap gap-x-2 gap-y-2'>
                                    {Array(userTickets)
                                        .fill("")
                                        .map((_, index) => (
                                            <p
                                                className='text-emerald-300 font-poppins h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic'
                                                key={index}
                                            >{index + 1}</p>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
