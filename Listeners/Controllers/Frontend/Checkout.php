<?php declare(strict_types=1);

/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Checkout Signature
 *
 * @package   OstCheckoutSignature
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@aquatuning.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

namespace OstCheckoutSignature\Listeners\Controllers\Frontend;

use Enlight_Controller_Action as Controller;
use Enlight_Event_EventArgs as EventArgs;
use Enlight_Hook_HookArgs as HookArgs;
use Shopware\Components\Model\ModelManager;
use Shopware\Models\Order\Order;

class Checkout
{
    /**
     * ...
     *
     * @var string
     */
    protected $viewDir;

    /**
     * ...
     *
     * @var array
     */
    protected $configuration;

    /**
     * ...
     *
     * @param string $viewDir
     * @param array  $configuration
     */
    public function __construct($viewDir, array $configuration)
    {
        // set params
        $this->viewDir = $viewDir;
        $this->configuration = $configuration;
    }

    /**
     * ...
     *
     * @param EventArgs $arguments
     */
    public function onPostDispatch(EventArgs $arguments)
    {
        /* @var $controller Controller */
        $controller = $arguments->get('subject');
        $request = $controller->Request();
        $view = $controller->View();
        $controllerName = $request->getControllerName();

        // add template dir
        $view->addTemplateDir($this->viewDir);
    }

    /**
     * ...
     *
     * @param HookArgs $arguments
     *
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Exception
     */
    public function afterSaveOrder(HookArgs $arguments)
    {
        /** @var \Shopware_Controllers_Frontend_Checkout $controller */
        $controller = $arguments->getSubject();

        /** @var ModelManager $db */
        $db = $controller->get('models');

        $return = $arguments->getReturn();

        /** @var Order $order */
        $order = $db->getRepository(Order::class)->findOneBy(['number' => $return]);

        if ($order === null) {
            return;
        }

        /** @var \Shopware\Models\Attribute\Order $orderDetails */
        $orderDetails = $order->getAttribute();

        if ($orderDetails === null || (!($orderDetails instanceof \Shopware\Models\Attribute\Order))) {
            return;
        }

        if (!$controller->Request()->isPost()) {
            return;
        }

        /** @var mixed $signatureData */
        $signatureData = $controller->Request()->getPost('signatureData');

        $orderDetails->setOstCheckoutSignature($signatureData);

        $db->flush();
    }
}
