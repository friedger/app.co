import * as React from 'react'
import { Flex, Type, AppMiningLogo } from 'blockstack-ui'
import { OutlinedLogo } from '@components/mining/svg'
import { CallToAction, Countdown, Wrapper } from '../shared'

const Header = ({ showOnMobile, link, ...rest }) => {
  return (
    <Flex
      height={90}
      bg="blue.dark"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width={1}
      zIndex={999}
      display={showOnMobile ? 'flex' : ['none', 'none', 'flex']}
      {...rest}
    >
      <Wrapper justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Flex alignItems="center" flexGrow={1}>
            <Flex
              style={{ textDecoration: 'none' }}
              is={link ? 'a' : undefined}
              href={link ? '/mining' : undefined}
              pr={2}
            >
              <AppMiningLogo typeSize={20} invert />
            </Flex>
          </Flex>
          <Type
            display="inline-flex"
            flexDirection={['column', 'column', 'column', 'row']}
            color="white"
            pl={2}
            flexGrow={1}
            pt={"2px"}
          >
            Next ranking starts in <Countdown pl={[0, 0, 0, 2]} />
          </Type>
        </Flex>
        <Flex display={['none', 'none', 'flex']}>
          <CallToAction
            buttonProps={{
              py: 4,
              px: [4, 4, 4, 6],
              fontSize: [2]
            }}
            hideTimer
          />
        </Flex>
      </Wrapper>
    </Flex>
  )
}
export { Header }
