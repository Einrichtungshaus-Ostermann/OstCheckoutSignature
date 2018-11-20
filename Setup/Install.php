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

namespace OstCheckoutSignature\Setup;

use Shopware\Bundle\AttributeBundle\Service\CrudService;
use Shopware\Components\Model\ModelManager;
use Shopware\Components\Plugin;
use Shopware\Components\Plugin\Context\InstallContext;

class Install
{
    /**
     * Main bootstrap object.
     *
     * @var Plugin
     */
    protected $plugin;

    /**
     * ...
     *
     * @var InstallContext
     */
    protected $context;

    /**
     * ...
     *
     * @var ModelManager
     */
    protected $modelManager;

    /**
     * ...
     *
     * @var CrudService
     */
    protected $crudService;

    /**
     * ...
     *
     * @var array
     */
    protected $attributes = [
        's_order_attributes' => [
            [
                'column' => 'ost_checkout_signature',
                'type'   => 'text',
                'data'   => [
                    'translatable'     => false,
                    'displayInBackend' => false,
                    'custom'           => false
                ]
            ]
        ]
    ];

    /**
     * ...
     *
     * @param Plugin         $plugin
     * @param InstallContext $context
     * @param ModelManager   $modelManager
     * @param CrudService    $crudService
     */
    public function __construct(Plugin $plugin, InstallContext $context, ModelManager $modelManager, CrudService $crudService)
    {
        // set params
        $this->plugin = $plugin;
        $this->context = $context;
        $this->modelManager = $modelManager;
        $this->crudService = $crudService;
    }

    /**
     * ...
     *
     * @throws \Exception
     */
    public function install()
    {
        // ...
        foreach ($this->attributes as $table => $attributes) {
            foreach ($attributes as $attribute) {
                $this->crudService->update(
                    $table,
                    $attribute['column'],
                    $attribute['type'],
                    $attribute['data']
                );
            }
        }

        // ...
        $this->modelManager->generateAttributeModels(array_keys($this->attributes));
    }
}
