import React from 'react'
import { Flex, Box, Type } from 'blockstack-ui'
import { Hover, State } from 'react-powerplug'
import { Title, Wrapper, LearnMore, ObservedSection } from '@components/mining/shared'

import numeral from 'numeral'
import { ChevronRightIcon, ChevronLeftIcon } from 'mdi-react'

const Pill = ({ display, ...rest }) => (
  <Box mr={2} py="6px" borderRadius={30} px="12px" bg="#E4ECF1" display={display}>
    <Type {...rest} fontSize="11px" opacity={0.75} />
  </Box>
)

const Row = ({
  name,
  index,
  imgixImageUrl,
  formattedUsdRewards,
  storageNetwork,
  authentication,
  lifetimeEarnings,
  ...rest
}) => (
  <Flex mb={'1px'} py={5} bg={'white'}>
    <Flex width={[40, 60]} alignItems={'center'} justifyContent="center">
      <Type fontFamily="brand">{index + 1}</Type>
    </Flex>
    <Flex
      width={5 / 8}
      style={{ textDecoration: 'none' }}
      alignItems={['flex-start', 'flex-start', 'flex-start', 'center']}
      is="a"
      href={rest.Slugs && rest.Slugs.length ? `https://app.co/app/${rest.Slugs[0].value}` : undefined}
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <Flex alignItems="center">
        <Box
          size={[24]}
          backgroundImage={`url(${imgixImageUrl})`}
          backgroundSize="cover"
          boxShadow="card"
          borderRadius={4}
        />
        <Type ml={4} fontSize={2} fontWeight={400} color="blue.dark">
          {name}
        </Type>
      </Flex>
      <Flex
        display={authentication === 'Blockstack' || storageNetwork === 'Gaia' ? 'flex' : 'none'}
        alignItems="center"
        pt={[3, 3, 3, 0]}
        pl={[0, 0, 0, 3]}
      >
        {authentication === 'Blockstack' ? <Pill display={['none', 'none', 'flex']}>Blockstack Auth</Pill> : null}
        {storageNetwork === 'Gaia' ? <Pill display={['none', 'none', 'flex']}>Gaia</Pill> : null}
      </Flex>
    </Flex>
    <Flex width={[2 / 3, 2 / 3, 3 / 8]} ml="auto" alignItems="center">
      <Flex justifyContent={['flex-end', 'center']} textAlign="center" width={[1, 1 / 2]} pr={6}>
        <Type fontFamily="brand" color="blue">
          {formattedUsdRewards.split('.')[0]}
        </Type>
      </Flex>
      <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} pr={5} display={['none', 'flex']}>
        <Type fontFamily="brand" color="blue">
          {lifetimeEarnings ? numeral(String(lifetimeEarnings).split('.')[0]).format('$0,0') : '--'}
        </Type>
      </Flex>
    </Flex>
  </Flex>
)

const ArrowButton = ({ disabled, icon: Icon, ...rest }) => (
  <Hover>
    {({ hovered, bind }) => (
      <Box
        {...bind}
        cursor={hovered && !disabled ? 'pointer' : 'unset'}
        pt={1}
        px={2}
        opacity={disabled ? '0.25' : 1}
        color={hovered && !disabled ? 'blue' : undefined}
        display={['block', 'none']}
        {...rest}
      >
        <Icon size={16} />
      </Box>
    )}
  </Hover>
)

const Table = ({ apps, state, limit = 7, months, decrementMonth, incrementMonth, ...rest }) => {
  return (
    <Box width={1}>
      <Flex mb="1px" py={5} bg="white">
        <Type width={[1 / 3, 5 / 8]} pl={5}>
          <Type display={['none', 'inline']}>App Mining</Type> Rank
        </Type>
        <Flex style={{ userSelect: 'none' }} width={[2 / 3, 2 / 3, 3 / 8]} ml="auto" alignItems="center">
          <Flex alignItems="center" justifyContent={['flex-end', 'center']} textAlign="center" width={[1, 1 / 2]}>
            <ArrowButton icon={ChevronLeftIcon} onClick={decrementMonth} pt={1} px={2} disabled={state.month === 0} />
            <Type style={{ whiteSpace: 'nowrap' }}>
              {months[state.month].monthName} {months[state.month].year.toString().replace('20', "'")}
            </Type>
            <ArrowButton
              icon={ChevronRightIcon}
              onClick={incrementMonth}
              disabled={state.month === months.length - 1}
            />
          </Flex>
          <Flex justifyContent="flex-end" textAlign="right" width={1 / 2} display={['none', 'flex']} pr={5}>
            <Type style={{ whiteSpace: 'nowrap' }}>Lifetime</Type>
          </Flex>
        </Flex>
      </Flex>
      <>
        {apps.map((app, i) =>
          state.all ? <Row key={i} index={i} {...app} /> : i < limit ? <Row key={i} index={i} {...app} /> : null
        )}
      </>
    </Box>
  )
}

const HowMuchSection = ({ apps, months, ...rest }) => (
  <ObservedSection bg="blue.light" {...rest}>
    {({ inView }) => (
      <Wrapper inView={inView} observed>
        <Flex width={[1]} flexShrink={0} flexDirection="column">
          <Title maxWidth="100%">How much can you earn?</Title>
          <Type maxWidth={700} lineHeight={1.65} pt={6}>
            We currently pay in BTC for legal compliance. We plan to begin paying Stacks tokens early 2019 provided
            compliance with all applicable law.
          </Type>
          <Flex mt={7} width={1} flexDirection="column" alignItems="center" justifyContent="center">
            <State initial={{ all: false, showMenu: false, month: months.length - 1 }}>
              {({ state, setState }) => {
                const decrementMonth = () => {
                  if (state.month !== 0) {
                    setState((s) => ({
                      month: s.month - 1
                    }))
                  }
                }
                const incrementMonth = () => {
                  if (state.month < months.length - 1) {
                    setState((s) => ({
                      month: s.month + 1
                    }))
                  }
                }

                const setMonth = (index) => setState({ month: index })

                return (
                  <Flex flexDirection={['column', 'row']} width={1}>
                    <Box order={[2, 1]} flexGrow={1}>
                      <Table
                        limit={8}
                        state={state}
                        months={months}
                        apps={months[state.month].apps}
                        decrementMonth={decrementMonth}
                        incrementMonth={incrementMonth}
                      />
                      {!state.all ? (
                        <Box pt={7}>
                          <LearnMore
                            position="static"
                            color="blue.dark"
                            hoverColor="blue"
                            label={'Show more apps'}
                            onClick={() => setState({ all: true })}
                          />
                        </Box>
                      ) : null}
                    </Box>
                    <Box width={[1, 1 / 4]} minWidth="180px" pl={[0, 4]} order={[1, 2]}>
                      <Box position="sticky" top="110px">
                        <Box
                          display={['none', 'block']}
                          bg="white"
                          color="blue.dark"
                          borderRadius={2}
                          py={5}
                          px={4}
                          mb="1px"
                        >
                          <Type lineHeight={1.45} fontSize={2}>
                            Monthly Results
                          </Type>
                        </Box>
                        <Flex flexGrow={1} flexDirection={['row-reverse', 'column-reverse']}>
                          {months.map((month, i) => (
                            <Hover>
                              {({ hovered, bind }) => (
                                <Box
                                  textAlign={['center', 'left']}
                                  flexGrow={1}
                                  borderLeft="3px solid"
                                  bg="white"
                                  color="blue.dark"
                                  borderColor={i === state.month ? 'blue' : hovered ? 'blue.mid' : 'transparent'}
                                  py={4}
                                  px={4}
                                  mb="1px"
                                  key={i}
                                  cursor={hovered ? 'pointer' : 'unset'}
                                  onClick={() => setMonth(i)}
                                  transition="0.1s all ease-in-out"
                                  {...bind}
                                >
                                  <Type
                                    opacity={hovered || i === state.month ? 1 : 0.7}
                                    fontWeight={i === state.month ? 'bold' : '400'}
                                  >
                                    <Type display={['none', 'inline']}>{month.monthName}</Type>
                                    <Type display={['inline', 'none']}>{month.month}</Type>{' '}
                                    {month.year.toString().replace('20', "'")}
                                  </Type>
                                </Box>
                              )}
                            </Hover>
                          ))}
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                )
              }}
            </State>
          </Flex>
        </Flex>
      </Wrapper>
    )}
  </ObservedSection>
)

export { HowMuchSection }
